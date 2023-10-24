import { useState } from 'react';
// import Table from 'react-bootstrap/Table';

// import { InvestmentRepository } from '../../infrastructure';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Button, Card } from 'react-bootstrap';
import usePaginatedSearchInvestment from '../../application/hooks/usePaginatedSearchInvestment';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import TablePaginated from '@/core/components/table/TablePaginated';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import {
	createColumnHelper,
	// flexRender,
	// getCoreRowModel,
	// useReactTable,
} from '@tanstack/react-table';
import { TailSpin } from 'react-loader-spinner';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useRemoveInvestment from '../../application/hooks/useRemoveInvestment';

const index = (): JSX.Element => {
	// //Hooks
	// const [investments, investmentsSet] = useState<InvestmentResponse[]>([]);

	// useEffect(() => {
	// 	void loadHolder();
	// }, []);

	// //Métodos
	// const loadHolder = async (): Promise<void> => {
	// 	// const response = await InvestmentRepository.findAll();
	// 	const response = await InvestmentRepository.paginatedSearch(investmentFilter);

	// 	investmentsSet(response.data);
	// 	console.log('response: ', response);
	// };

	const [investmentFilter, setInvestmentFilter] = useState<RequestPagination<InvestmentFilter>>({
		page: 1,
		perPage: 10,
	});

	const formik = useFormik<InvestmentFilter>({
		initialValues: {
			description: '',
			year: 0,
			monthname: '',
		},
		onSubmit: values => {
			console.log('values', values);

			setInvestmentFilter(prev => {
				return {
					...prev,
					filter: {
						description: values.description,
						year: values.year,
						monthname: values.monthname,
					},
				};
			});
		},
	});

	// React Query
	const { data: investmentPaginated, isFetching } = usePaginatedSearchInvestment(investmentFilter);

	const { mutateAsync } = useRemoveInvestment();

	// React Table
	const columnHelper = createColumnHelper<InvestmentResponse>();

	const columns = [
		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center">Acciones</span>,
			cell: ({ row }) => (
				<span className="d-flex align-items-center justify-content-center">
					<Link className="btn btn-primary btn-sm me-2" to={`/investment/edit/${row.original.id}`}>
						✎{' '}
					</Link>
					<Button
						type="button"
						variant="danger"
						className="me-2 btn-sm"
						onClick={() => {
							void removeById(row.original);
						}}
					>
						🗑{' '}
					</Button>
				</span>
			),
		}),
		columnHelper.accessor('description', {
			header: 'Descripción',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('year', {
			header: 'Año',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('monthname', {
			header: 'Mes',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('registrationDate', {
			header: 'Fech. Registro',
			cell: info => {
				const date = new Date(info.getValue());

				return date.toLocaleDateString('es-PE');
			},
		}),
		columnHelper.accessor('state', {
			header: 'Estado',
			cell: ({ row }) => (
				<div className="text-center">
					<Badge pill bg={row.original.state ? 'success' : 'danger'}>
						{row.original.state ? 'Activo' : 'Elminado'}
					</Badge>
				</div>
			),
		}),
	];

	// Methods
	const goToPage = (payload: FilterPage): void => {
		console.log('value of isFetching:', isFetching);
		if (!isFetching) {
			setInvestmentFilter(prev => {
				return {
					...prev,
					page: payload.page,
					perPage: payload.perPage,
				};
			});
		}
	};

	// const table = useReactTable<InvestmentResponse>({
	// 	data: investmentPaginated?.data ?? [],
	// 	columns,
	// 	getCoreRowModel: getCoreRowModel(),
	// });

	const removeById = async (payload: InvestmentResponse): Promise<void> => {
		const selectedOption = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		});

		if (selectedOption.isConfirmed) {
			await mutateAsync(payload.id);
		}
	};

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item active>Investment</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-success" to="/investment/create">
						Nuevo
					</Link>
				</li>
			</Breadcrumb>

			<Row className="">
				<Col xs={12}>
					<Card className="mb-2">
						<Card.Header>Búsqueda </Card.Header>
						<Card.Body>
							<Row>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Descripción</Form.Label>
										<Form.Control
											type="text"
											name="description"
											value={formik.values.description}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Año</Form.Label>
										<Form.Control
											type="text"
											name="year"
											value={formik.values.year}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Mes</Form.Label>
										<Form.Control
											type="text"
											name="monthname"
											value={formik.values.monthname}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Card.Body>
						<Card.Footer className="d-flex justify-content-end">
							<Button
								type="button"
								variant="primary"
								className="me-2"
								onClick={() => {
									formik.handleSubmit();
								}}
							>
								Buscar
							</Button>
							{''}
							<Button type="button" variant="secondary" onClick={formik.handleReset}>
								Limpiar
							</Button>
						</Card.Footer>
					</Card>
					<Card>
						<Card.Header>Listado de Investments</Card.Header>
						<Card.Body>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<TailSpin
									height="80"
									width="80"
									color="#4fa94d"
									ariaLabel="tail-spin-loading"
									radius="1"
									wrapperStyle={{}}
									wrapperClass=""
									visible={isFetching}
								/>
							</div>

							<TablePaginated<InvestmentResponse>
								columns={columns}
								data={investmentPaginated}
								goToPage={goToPage}
								loading={isFetching}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;

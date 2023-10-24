import { useEffect, type JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type InvestmentRequest } from '../../domain';
import { Link } from 'react-router-dom';
import useFindByIdInvestment from '../../application/hooks/useFindByIdInvestment';

interface FormSaveProps {
	id?: number;
	pageTitle: string;
	onSave: (payload: InvestmentRequest) => void;
}

const FormSave = ({ id, pageTitle, onSave }: FormSaveProps): JSX.Element => {
	// Attibutes

	const formik = useFormik<InvestmentRequest>({
		initialValues: {
			description: '',
			year: 0,
			monthname: '',
			miningconcessionid: 0,
			investmenttypeid: 0,
			periodtypeid: 0,
			measureunitid: 0,
			holderid: 0,
			investmentconceptid: 0,
		},
		validationSchema: Yup.object({
			description: Yup.string().required(),
			year: Yup.number().required(),
			monthname: Yup.string().required(),
			miningconcessionid: Yup.number(),
			investmenttypeid: Yup.number(),
			periodtypeid: Yup.number(),
			measureunitid: Yup.number(),
			holderid: Yup.number(),
			investmentconceptid: Yup.number(),
		}),
		onSubmit: values => {
			onSave(values);
		},
	});

	// React Query
	const { data: investment } = useFindByIdInvestment(id);

	// Hooks
	useEffect(() => {
		if (investment != null) {
			void formik.setValues({
				...investment,
			});
		}
	}, [investment]);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item>Investment</Breadcrumb.Item>
				<Breadcrumb.Item active>{pageTitle}</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-secondary" to="/investment">
						Atras
					</Link>
				</li>
			</Breadcrumb>
			<Row>
				<Col xs={12} sm={10} md={8} lg={8} xl={6}>
					<Card>
						<Card.Header>Registro de Tipos de Investment</Card.Header>
						<Card.Body>
							<Form className="d-grid gap-3" onSubmit={formik.handleSubmit}>
								<Form.Group>
									<Form.Label>Descripción</Form.Label>
									<Form.Control
										type="text"
										name="description"
										value={formik.values.description ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.description ?? false) && formik.errors.description != null && (
										<small className="text-danger">{formik.errors.description}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Año</Form.Label>
									<Form.Control
										type="text"
										name="year"
										value={formik.values.year ?? 0}
										onChange={formik.handleChange}
									/>
									{(formik.touched.year ?? false) && formik.errors.year != null && (
										<small className="text-danger">{formik.errors.year}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Mes</Form.Label>
									<Form.Control
										type="text"
										name="monthname"
										value={formik.values.monthname ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.monthname ?? false) && formik.errors.monthname != null && (
										<small className="text-danger">{formik.errors.monthname}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Miningconcession</Form.Label>
									<Form.Control
										type="text"
										name="miningconcessionid"
										value={formik.values.miningconcessionid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.miningconcessionid ?? false) &&
										formik.errors.miningconcessionid != null && (
											<small className="text-danger">{formik.errors.miningconcessionid}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Investmenttype</Form.Label>
									<Form.Control
										type="text"
										name="investmenttypeid"
										value={formik.values.investmenttypeid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmenttypeid ?? false) &&
										formik.errors.investmenttypeid != null && (
											<small className="text-danger">{formik.errors.investmenttypeid}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Periodtype</Form.Label>
									<Form.Control
										type="text"
										name="periodtypeid"
										value={formik.values.periodtypeid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.periodtypeid ?? false) && formik.errors.periodtypeid != null && (
										<small className="text-danger">{formik.errors.periodtypeid}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Measureunit</Form.Label>
									<Form.Control
										type="text"
										name="measureunitid"
										value={formik.values.measureunitid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.measureunitid ?? false) &&
										formik.errors.measureunitid != null && (
											<small className="text-danger">{formik.errors.measureunitid}</small>
										)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Holder</Form.Label>
									<Form.Control
										type="text"
										name="holderid"
										value={formik.values.holderid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.holderid ?? false) && formik.errors.holderid != null && (
										<small className="text-danger">{formik.errors.holderid}</small>
									)}
								</Form.Group>
								<Form.Group>
									<Form.Label>Investmentconcept</Form.Label>
									<Form.Control
										type="text"
										name="investmentconceptid"
										value={formik.values.investmentconceptid ?? ''}
										onChange={formik.handleChange}
									/>
									{(formik.touched.investmentconceptid ?? false) &&
										formik.errors.investmentconceptid != null && (
											<small className="text-danger">{formik.errors.investmentconceptid}</small>
										)}
								</Form.Group>
								<hr />
								<div className="d-flex justify-content-end">
									<Button type="submit" variant="primary" className="me-2">
										Guardar
									</Button>
									<Button type="button" variant="secondary" onClick={formik.handleReset}>
										Limpiar
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default FormSave;

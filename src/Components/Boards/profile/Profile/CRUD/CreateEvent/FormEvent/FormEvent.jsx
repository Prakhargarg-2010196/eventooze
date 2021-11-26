// eslint:disable:no-unused-vars
// eslint:disable-next-line:no-unused-vars
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import React, { useState } from "react";

import { CategorySelect } from "./CategorySelect/CategorySelect";
import { DragNDrop } from "./DragNDrop/DragNDrop";
import { Loader } from "../../../../../../Layout/Loader/Loader";
import TimeField from "react-simple-timefield";
import crudService from "../../../../../../../api/services/crud-service";
import styles from "./FormEvent.module.css";
import { useHistory } from "react-router-dom";

const FormEvent = (props) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [Categories, setArray] = useState([]);
	const [dateValue, setDateValue] = useState(null);
	const [timeValue, setTimeValue] = useState();
	const [optionValue, setOptionValue] = useState("");
	const [Url, setUrl] = useState("");
	const [City, setCity] = useState("");
	const [Address, setAddress] = useState("");
	const [money, setMoney] = useState("");
	const history = useHistory();
	const [Files, setFilesArray] = useState([]);
	const [message, setMessage] = useState("");
	const [successful, setSuccess] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		contentErr: "",
		titleErr: "",
		urlErr: "",
		dateErr: "",
		timeErr: "",
		rateErr: "",
		modeErr: "",
		addressErr: "",
		cityErr: "",
	});

	const handleBlurRate = () => {
		let rateErr = "";
		if ((typeof Number(money) !== "number")) rateErr = " Price must be a number";
		if (!money) rateErr = " Price is required";
		setErrors({ rateErr: rateErr });
	};
	const handleBlurContent = () => {
		let contentErr = "";
		if (!content) contentErr = " content Can't be empty";
		setErrors({ contentErr });
	};
	const handleBlurMode = () => {
		let modeErr = "";
		if (!optionValue) modeErr = " One Mode should be selected";
		setErrors({ modeErr });
	};
	const handleBlurTime = () => {
		let timeErr = "";
		if (!timeValue) timeErr = "Time can't be empty ";
		setErrors({ timeErr });
	};
	const handleBlurDate = () => {
		let dateErr = "";
		if (!dateValue) dateErr = " Date Can't be empty";
		setErrors({ dateErr });
	};
	const handleBlurTitle = () => {
		let titleErr = "";
		if (!title) titleErr = " title Can't be empty";
		setErrors({ titleErr });
	};
	const handleBlurUrl = () => {
		let urlErr = "";
		console.log(typeof Url);
		const urlReg =
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
		if (!Url) urlErr = " url Can't be empty";
		if (Url && urlReg.test(Url) === false) urlErr = " url is invalid";
		setErrors({ urlErr });
	};
	const handleBlurAddress = () => {
		let addressErr = "";

		if (!Address) addressErr = "Address Can't be empty";
		setErrors({ addressErr });
	};
	const handleBlurCity = () => {
		let cityErr = "";

		if (!City) cityErr = "City Can't be empty";
		setErrors({ cityErr });
	};

	const handleDateUpdate = (e) => {
		const dateValue = e.target.value;
		const dateValueInEpoch = new Date(dateValue).getTime();
		const dateValueToBe = new Date(dateValue);
		const currentDate = new Date();
		if (dateValueToBe.getDate() - currentDate.getDate() >= 0)
			setDateValue(dateValueInEpoch);
			else setErrors({dateErr:"invalid date"})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleKeyPress(e);

		const isOnline = optionValue === "Online" ? true : false;
		const venueORlink = optionValue === "Offline" ? Address : Url;
		const city = optionValue === "Offline" ? City : "Online";

		var FileData = new FormData();
		Files.forEach((file) => {
			FileData.append("files", file);
		});

		FileData.append("title", title);
		FileData.append("content", content);
		FileData.append("date", dateValue);
		FileData.append("city", city);
		FileData.append("time", timeValue);

		Categories.forEach((category) => {
			FileData.append("category", category);
		});
		FileData.append("isOnline", isOnline);
		FileData.append("venueORlink", venueORlink);
		FileData.append("rate", money);

		setLoading(true);
		await crudService.Create(FileData).then(
			(response) => {
				setSuccess(true);
				setLoading(false);
				history.push("/ManageEvent");
			},
			(error) => {
				let message = "";
				if (error.response.status === 401 || error.response.data === 402)
					history.push("/LogInPage");
				else if (!error.response) {
					message = JSON.stringify(error.message).replace(/^"|"$/g, "");
				} else message = error.response.data;
				setMessage(message);
				setLoading(false);
			}
		);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") e.preventDefault();
	};

	return (
		<>
			{isLoading ? (
				<Loader message={"Your Data is being uploaded please wait "} />
			) : (
				<Container>
					<h1 style={{ textAlign: "center" }}>Create Events</h1>
					<Row className="mt-5">
						{/* DragDrop */}
						<Col md={6} xs={12}>
							<Row>
								<Form.Label className={styles.requiredField}>
									Browse select one at a time or select multiple or drop
									multiple{" "}
								</Form.Label>

								<DragNDrop onGet={setFilesArray} />
							</Row>
							{/* DragDrop END */}

							{/* Content */}
							<Row className="mt-5">
								<Form.Label className={styles.requiredField}>
									Content
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={5}
									onChange={(e) => {
										setContent(e.target.value);
									}}
									onBlur={() => {
										handleBlurContent();
									}}
									
								/>
								<div className="text-danger">{errors.contentErr}</div>
							</Row>
							{/* Content end  */}
						</Col>

						<Col md={6}>
							<Form className={styles.form}>
								{/* Title */}
								<Row className="mb-3">
									<Col>
										<Form.Label className={styles.requiredField}>
											Title
										</Form.Label>
									</Col>
									<Col xs={12}>
										<Form.Control
											type="text"
											placeholder=""
											onChange={(e) => {
												setTitle(e.target.value);
											}}
											onBlur={() => {
												handleBlurTitle();
											}}
										/>
									</Col>
									<span className="text-danger">{errors.titleErr}</span>
								</Row>
								{/*Title end*/}

								{/* Category start */}
								<Row>
									<Col xs={12}>
										<Form.Label className={styles.requiredField}>
											Category
										</Form.Label>
									</Col>
									<Col xs={12}>
										<CategorySelect onSelect={setArray} />
									</Col>
								</Row>

								{/* Category end */}

								{/* Date Start */}
								<Row className="mt-4">
									<Col xs={12}>
										<Form.Label className={styles.requiredField}>
											Date{" "}
										</Form.Label>
									</Col>
									<Col xs={12}>
										<input
											className="form-control"
											type="date"
											onChange={(e) => handleDateUpdate(e)}
											onBlur={() => {
												handleBlurDate();
											}}
										/>
									</Col>
									<span className="text-danger">{errors.dateErr}</span>
								</Row>

								{/* Date end */}

								{/* Time start*/}
								<Row className="mt-4">
									<Col xs={12}>
										<Form.Label>Time(HH:MM) </Form.Label>
									</Col>

									<Col>
										<TimeField
											value={timeValue}
											onChange={(e) => setTimeValue(e.target.value)}
											onBlur={() => {
												handleBlurTime();
											}}
											className="w-100"
										/>
									</Col>
									<span className="text-danger">{errors.timeErr}</span>
								</Row>
								{/* Time end */}

								{/* Mode of events */}
								<Row className="mt-4">
									<Form.Label
										className={styles.requiredField}
										style={{ marginBottom: "30px" }}
									>
										Mode of Event
									</Form.Label>

									{/*Online Option  */}
									<Col>
										<div className="form-check">
											<label
												className="form-check-label"
												htmlFor="flexRadioDefault1"
											>
												<input
													className="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="flexRadioDefault1"
													value="Online"
													onChange={(e) => {
														setOptionValue(e.target.value);
													}}
													onBlur={() => {
														handleBlurMode();
													}}
												/>
												Online
											</label>

											{optionValue === "Online" && (
												<Col>
													<Form.Label className={styles.requiredField}>
														Url
													</Form.Label>
													<Form.Control
														type="url"
														placeholder=""
														onChange={(e) => {
															setUrl(e.target.value);
														}}
														onBlur={() => {
															handleBlurUrl();
														}}
													/>
													<div className="text-danger">{errors.urlErr}</div>
												</Col>
											)}
										</div>
									</Col>

									{/* Offline option */}
									<Col>
										<div className="form-check">
											<label
												className="form-check-label"
												htmlFor="flexRadioDefault2"
											>
												<input
													className="form-check-input mb-4"
													type="radio"
													name="flexRadioDefault"
													id="flexRadioDefault2"
													value="Offline"
													onChange={(e) => {
														setOptionValue(e.target.value);
													}}
													onBlur={() => {
														handleBlurMode();
													}}
												/>
												Offline
											</label>

											{optionValue === "Offline" && (
												<>
													<Row>
														<Col>
															<Form.Label className={styles.requiredField}>
																Main Address
															</Form.Label>
															<Form.Control
																as="textarea"
																rows={3}
																className={styles.formTextArea}
																onChange={(e) => {
																	setAddress(e.target.value);
																}}
																onBlur={() => {
																	handleBlurAddress();
																}}
															/>
														</Col>
														<div className="text-danger">
															{errors.addressErr}
														</div>
													</Row>
													<Row className="mt-4">
														<Col>
															<Form.Label className={styles.requiredField}>
																City
															</Form.Label>
														</Col>
														<Col>
															<Form.Control
																type="text"
																placeholder=""
																onChange={(e) => {
																	setCity(e.target.value);
																}}
																onBlur={() => {
																	handleBlurCity();
																}}
															/>
														</Col>
														<div className="text-danger">
															{errors.cityErr}
														</div>
													</Row>
												</>
											)}
										</div>
									</Col>
									<span className="text-danger">{errors.modeErr}</span>
								</Row>
								{/* Mode of events end */}

								{/* Money */}
								<Row className="mt-5">
									<Col md={6} xs={12}>
										<Form.Label className={styles.requiredField}>
											Price(in INR)
										</Form.Label>
									</Col>
									<Col md={6} xs={12}>
										<InputGroup className="">
											<InputGroup.Text>₹</InputGroup.Text>
											<Form.Control
												aria-label="Amount (to the nearest rupee)"
												type="text"
												className="w-50"
												onChange={(e) => {
													setMoney(e.target.value);
												}}
												onBlur={() => {
													handleBlurRate();
												}}
											/>
										</InputGroup>
									</Col>
									<span className="text-danger">{errors.rateErr}</span>
								</Row>

								{/* money end */}

								<Button
									variant="primary"
									className={styles.button}
									onClick={(e) => {
										handleSubmit(e);
									}}
									disabled={
										!title ||
										!content ||
										!Categories ||
										!dateValue ||
										!timeValue ||
										!optionValue ||
										!money ||
										Files.length === 0
									}
									onKeyPress={(e) => {
										handleKeyPress(e);
									}}
								>
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
					{message && (
						<div className="form-group mt-2">
							<div
								className={
									successful ? "alert alert-success" : "alert alert-danger"
								}
								role="alert"
							>
								{message}
							</div>
						</div>
					)}
				</Container>
			)}
		</>
	);
};
export default FormEvent;

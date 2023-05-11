import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Divider } from "antd";
import "./quote.css";
import logo from "../imgs/logo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Quote = () => {
  const [buttonLang, setButtonLang] = useState("EN");
  const [quoteTitle, setQuoteTitle] = useState("Motion Graphics");
  const [quoteDate, setQuoteDate] = useState("10-10-23");
  const [quoteNumber, setQuoteNumber] = useState("A00001");
  const [businessName, setBusinessName] = useState("DGA Studios SpA");
  const [clientName, setClientName] = useState("Tribologicos S.A");
  const [address, setAddress] = useState("Bellavista 0290");
  const [city, setCity] = useState("Santiago");
  const [email, setEmail] = useState("ventas@dgastudios.cl");
  const [clientAddress, setClientAddress] = useState("Tribologicos address");
  const [clientCity, setClientCity] = useState("Temuco");
  const [clientEmail, setClientEmail] = useState("contacto@tribologicos.cl");
  const [services, setServices] = useState([
    { Title: "Animacion 2D", Rate: 400000, Quantity: "1", Tax: 19 },
    { Title: "Montaje", Rate: 360000, Quantity: "1", Tax: 19 },
  ]);
  const [limitedText, setLimitedText] = useState(
    "Short Description Text 250 char max!"
  );
  const [unlimitedText, setUnlimitedText] = useState(
    "Long Description, no limit"
  );
  const [moreText, setMoreText] = useState(false);
  const [moreTextBtn, setMoreTextBtn] = useState("More...");
  const [subtotal, setSubtotal] = useState("");
  const [taxes, setTaxes] = useState("");
  const [total, setTotal] = useState("");

  function GetSubtotal() {
    let tempTotal = 0;
    services.map((data) => (tempTotal += data.Rate * data.Quantity));
    setSubtotal(tempTotal);
  }

  function GetTaxes() {
    let tempTotal = 0;
    services.map(
      (data) => (tempTotal += (data.Rate * data.Quantity * data.Tax) / 100)
    );
    setTaxes(tempTotal);
  }
  function GetTotal() {
    let tempTotal = 0;
    services.map(
      (data) =>
        (tempTotal +=
          data.Rate * data.Quantity * (data.Tax / 100) +
          data.Rate * data.Quantity)
    );
    setTotal(tempTotal);
  }

  useEffect(() => {
    GetSubtotal();
    GetTaxes();
    GetTotal();
  }, services);

  function ShowMore() {
    if (moreText == false) {
      setMoreText(true);
      setMoreTextBtn("Less");
    } else {
      setMoreText(false);
      setMoreTextBtn("More...");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      Title: e.target.title.value,
      Rate: parseFloat(e.target.rate.value),
      Quantity: e.target.quantity.value,
      Tax: parseFloat(e.target.tax.value),
    };

    setServices([...services, newService]);
  };

  const handleRemoveService = (indexToRemove) => {
    setServices(services.filter((_, index) => index !== indexToRemove));
  };

  const handleLimitedTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setLimitedText(value);
    }
  };

  const handleUnlimitedTextChange = (e) => {
    setUnlimitedText(e.target.value);
  };

  const exportToPdf = () => {
    const input = document.getElementById("quote-to-pdf");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("quote.pdf");
    });
  };

  const handleLangChange = (e) => {
    e.preventDefault();
    if (buttonLang == "EN") {
      setButtonLang("ES");
    } else {
      setButtonLang("EN");
    }
  };

  return (
    <div className="quote">
      <Row gutter={8}>
        <Col span={12}>
          <div id="quote-to-pdf">
            <Card
              title={quoteTitle}
              style={{
                width: "100%",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <Row>
                <Col span={12}>
                  <div>
                    <img src={logo} alt="" width="256px" />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: "right" }}>
                    {buttonLang == "EN" ? (
                      <p>
                        Quotation No: <span>{quoteNumber}</span>
                      </p>
                    ) : (
                      <p>
                        Cotizacion No: <span>{quoteNumber}</span>
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {buttonLang == "EN" ? (
                      <p>
                        Quotation Date: <span>{quoteDate}</span>
                      </p>
                    ) : (
                      <p>
                        Fecha: <span>{quoteDate}</span>
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Card
                    title={buttonLang == "EN" ? "From" : "De"}
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <p>{businessName}</p>
                    <p>
                      {address}, <span>{city}</span>
                    </p>
                    <p>{email}</p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title={buttonLang == "EN" ? "For" : "Para"}
                    style={{
                      textAlign: "right",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <p>{clientName}</p>
                    <p>
                      {clientAddress}, <span>{clientCity}</span>
                    </p>
                    <p>{clientEmail}</p>
                  </Card>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Card
                  style={{
                    width: "100%",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <Row>
                    <Col span={10}>
                      {buttonLang == "EN" ? (
                        <h3>Description</h3>
                      ) : (
                        <h3>Descripcion</h3>
                      )}
                    </Col>
                    <Col span={4}>
                      {buttonLang == "EN" ? <h3>Rate</h3> : <h3>Precio</h3>}
                    </Col>
                    <Col span={4}>
                      {buttonLang == "EN" ? (
                        <h3>Quantity</h3>
                      ) : (
                        <h3>Cantidad</h3>
                      )}
                    </Col>
                    <Col span={2}>
                      {buttonLang == "EN" ? <h3>Tax</h3> : <h3>IVA</h3>}
                    </Col>
                    <Col span={4}>
                      {buttonLang == "EN" ? <h3>Amount</h3> : <h3>Total</h3>}
                    </Col>
                  </Row>
                  {services.map((data) => (
                    <Row>
                      <Col span={10}>{data.Title}</Col>
                      <Col span={4}>
                        {Intl.NumberFormat("en-US").format(data.Rate)}
                      </Col>
                      <Col span={4}>{data.Quantity}</Col>
                      <Col span={2}>{data.Tax + "%"}</Col>
                      <Col span={4}>
                        {Intl.NumberFormat("en-US").format(
                          data.Rate * data.Quantity +
                            (data.Rate * data.Quantity * data.Tax) / 100
                        )}
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Row>
              <Divider />
              <Row gutter={8}>
                <Col span={14}>
                  <Card
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    {" "}
                    <div style={{ width: "85%" }}>
                      {buttonLang == "EN" ? (
                        <h3>Terms and Conditions</h3>
                      ) : (
                        <h3>Terminos y Condiciones</h3>
                      )}

                      <p>{limitedText}</p>
                      {moreText == true ? <p>{unlimitedText}</p> : ""}
                      <Button onClick={(e) => ShowMore(e)}>
                        {moreTextBtn}
                      </Button>
                    </div>
                  </Card>
                </Col>
                <Col span={10} style={{ textAlign: "right" }}>
                  <Card
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={12}>
                            <h3>Subtotal</h3>
                          </Col>
                          <Col span={12}>
                            <h3>
                              {"$" +
                                Intl.NumberFormat("en-US").format(subtotal)}
                            </h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            {buttonLang == "EN" ? <h3>Taxes</h3> : <h3>IVA</h3>}
                          </Col>
                          <Col span={12}>
                            <h3>
                              {"$" + Intl.NumberFormat("en-US").format(taxes)}
                            </h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <h2>Total</h2>
                          </Col>
                          <Col span={12}>
                            <h2>
                              {"$" + Intl.NumberFormat("en-US").format(total)}
                            </h2>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
        <Col span={12}>
          <button onClick={(e) => handleLangChange(e)}>{buttonLang}</button>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Quote Title" : "Titulo Cotizacion"}
            </label>
            <input
              type="text"
              onChange={(e) => setQuoteTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Quote Number" : "Numero Cotizacion"}
            </label>
            <input
              type="text"
              onChange={(e) => setQuoteNumber(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Quote Date" : "Fecha Cotizacion"}{" "}
            </label>
            <input
              type="date"
              name=""
              id=""
              onChange={(e) => setQuoteDate(e.target.value)}
            />
          </div>
          <Divider />
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Business Name" : "Nombre de tu Empresa"}{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN"
                ? "Business Address"
                : "Direccion de tu Empresa"}{" "}
            </label>
            <input type="text" onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Quote Number" : "Numero Cotizacion"}
            </label>
            <input type="text" onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Business Email" : "Correo de tu Empresa"}{" "}
            </label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Divider />
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Client Name" : "Nombre Cliente"}{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {buttonLang == "EN" ? "Client Address" : "Direccion Cliente"}{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {" "}
              {buttonLang == "EN" ? "Client City" : "Ciudad Cliente"}{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setClientCity(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="">
              {" "}
              {buttonLang == "EN" ? "Client Email" : "Correo Cliente"}{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
          <Divider />
          <div>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="title">
                  {buttonLang == "EN" ? "Title:" : "Titulo:"}{" "}
                </label>
                <input type="text" id="title" name="title" required />
              </div>
              <div className="input-container">
                <label htmlFor="rate">
                  {buttonLang == "EN" ? "Rate:" : "Precio:"}{" "}
                </label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  step="0.01"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="quantity">
                  {" "}
                  {buttonLang == "EN" ? "Qauntity:" : "Cantidad"}{" "}
                </label>
                <input type="number" id="quantity" name="quantity" required />
              </div>
              <div className="input-container">
                <label htmlFor="tax">Tax:</label>
                <input type="number" id="tax" name="tax" step="0.01" required />
              </div>
              <button type="submit">
                {" "}
                {buttonLang == "EN" ? "Add Service" : "Agregar Servicio"}{" "}
              </button>
            </form>
            <h2>{buttonLang == "EN" ? "Services" : "Servicios"} </h2>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  {service.Title} - {service.Rate} - {service.Quantity} -{" "}
                  {service.Tax}{" "}
                  <button onClick={() => handleRemoveService(index)}>X</button>
                </li>
              ))}
            </ul>
          </div>
          <Divider />
          <form>
            <div className="textarea-container">
              <label htmlFor="limitedText">
                {buttonLang == "EN"
                  ? "Limited Text (250 characters)"
                  : "Texto Limitado (250 characters)"}{" "}
              </label>
              <textarea
                id="limitedText"
                name="limitedText"
                value={limitedText}
                onChange={handleLimitedTextChange}
              />
            </div>
            <Divider />
            <div className="textarea-container">
              <label htmlFor="unlimitedText">
                {" "}
                {buttonLang == "EN" ? "Unlimited Text" : "Texto Ilimitado"}{" "}
              </label>
              <textarea
                id="unlimitedText"
                name="unlimitedText"
                value={unlimitedText}
                onChange={handleUnlimitedTextChange}
              />
            </div>
          </form>
          <Divider />
          <Button onClick={exportToPdf}>Export to PDF</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Quote;

"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

export default function EventosFormPage(props) {
  const router = useRouter();

  const id = props.searchParams.id;
  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  const eventoEditado = eventos.find((item) => item.id === id);

  function salvar(dados) {
    if (eventoEditado) {
      Object.assign(eventoEditado, dados);
      localStorage.setItem("eventos", JSON.stringify(eventos));
    } else {
      dados.id = uuidv4();
      eventos.push(dados);
      localStorage.setItem("eventos", JSON.stringify(eventos));
    }

    alert("Evento salvo com sucesso!");
    router.push("/eventos");
  }

  const initialValues = {
    nome: "",
    data: "",
    local: "",
    organizador: "",
    equipesParticipantes: "",
    regras: "",
    observacoes: "",
    tipoEvento: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    data: Yup.date().required("Campo obrigatório"),
    local: Yup.string().required("Campo obrigatório"),
    organizador: Yup.string().required("Campo obrigatório"),
    equipesParticipantes: Yup.string().required("Campo obrigatório"),
    regras: Yup.string().required("Campo obrigatório"),
    observacoes: Yup.string(),
    tipoEvento: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Cadastro de Eventos">
      <Formik
        initialValues={eventoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Evento:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data:</Form.Label>
                <Form.Control
                  name="data"
                  type="date"
                  value={values.data}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.data && !errors.data}
                  isInvalid={touched.data && errors.data}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.data}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Local:</Form.Label>
                <Form.Control
                  name="local"
                  type="text"
                  value={values.local}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.local && !errors.local}
                  isInvalid={touched.local && errors.local}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.local}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Organizador:</Form.Label>
                <Form.Control
                  name="organizador"
                  type="text"
                  value={values.organizador}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.organizador && !errors.organizador}
                  isInvalid={touched.organizador && errors.organizador}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.organizador}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Equipes Participantes:</Form.Label>
                <Form.Control
                  name="equipesParticipantes"
                  type="text"
                  value={values.equipesParticipantes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.equipesParticipantes && !errors.equipesParticipantes}
                  isInvalid={touched.equipesParticipantes && errors.equipesParticipantes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.equipesParticipantes}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Regras:</Form.Label>
                <Form.Control
                  name="regras"
                  type="text"
                  value={values.regras}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.regras && !errors.regras}
                  isInvalid={touched.regras && errors.regras}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.regras}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                  name="observacoes"
                  type="text"
                  value={values.observacoes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.observacoes && !errors.observacoes}
                  isInvalid={touched.observacoes && errors.observacoes}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.observacoes}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tipo de Evento:</Form.Label>
                <Form.Select
                  name="tipoEvento"
                  value={values.tipoEvento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipoEvento && !errors.tipoEvento}
                  isInvalid={touched.tipoEvento && errors.tipoEvento}
                >
                  <option value="">Selecione</option>
                  <option value="CQB">CQB</option>
                  <option value="Campo Aberto">Campo Aberto</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.tipoEvento}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/eventos">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>


      
    </Pagina>

  );
}

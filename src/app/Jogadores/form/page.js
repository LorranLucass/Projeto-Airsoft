"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask"; 

export default function CadastroJogadores() {
  const [Jogadores, setJogadores] = useState({
    nome: "",
    apelido: "",
    equipe: "",
    email: "",
    telefone: "",
    experiencia: "",
    tipoArmaPreferida: "",
  });

  const [equipes, setEquipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const equipesLocalStorage = JSON.parse(localStorage.getItem("equipes")) || [
      { id: 1, nomeEquipe: "Alpha Squadron" },
      { id: 2, nomeEquipe: "Bravo Battalion" },
      { id: 3, nomeEquipe: "Delta Force" },
      { id: 4, nomeEquipe: "Omega Rangers" },
      { id: 5, nomeEquipe: "Black Knights" },
      { id: 6, nomeEquipe: "Red Storm" },
      { id: 7, nomeEquipe: "Green Berets" },
      { id: 8, nomeEquipe: "Phantom Elite" },
      { id: 9, nomeEquipe: "Ghost Recon" },
      { id: 10, nomeEquipe: "Titan Force" },
      { id: 11, nomeEquipe: "Storm Troopers" },
      { id: 12, nomeEquipe: "Viper Squad" },
      { id: 13, nomeEquipe: "Cobra Command" },
      { id: 14, nomeEquipe: "Shadow Ops" },
      { id: 15, nomeEquipe: "Rogue Warriors" },
      { id: 16, nomeEquipe: "Scorpion Team" },
      { id: 17, nomeEquipe: "Ironclad Warriors" },
      { id: 18, nomeEquipe: "Steel Rain" },
      { id: 19, nomeEquipe: "Reaper Command" },
      { id: 20, nomeEquipe: "Blaze Squad" },
    ];
    setEquipes(equipesLocalStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogadores({ ...Jogadores, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const JogadoresLocalStorage = JSON.parse(localStorage.getItem("Jogadores")) || [];
    Jogadores.id = Date.now();
    JogadoresLocalStorage.push(Jogadores);
    localStorage.setItem("Jogadores", JSON.stringify(JogadoresLocalStorage));
    alert("Jogadores cadastrado com sucesso!");
    router.push("/Jogadores");
  };

  return (
    <Pagina titulo={"Cadastro de Jogadores"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={Jogadores.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formApelido">
          <Form.Label>Apelido</Form.Label>
          <Form.Control
            type="text"
            name="apelido"
            value={Jogadores.apelido}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formEquipe">
          <Form.Label>Equipe</Form.Label>
          <Form.Control
            as="select"
            name="equipe"
            value={Jogadores.equipe}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma equipe</option>
            {equipes.map((equipe) => (
              <option key={equipe.id} value={equipe.id}>
                {equipe.nomeEquipe}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={Jogadores.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <InputMask
            mask="(99) 99999-9999"
            value={Jogadores.telefone}
            onChange={handleChange}
          >
            {(inputProps) => (
              <Form.Control
                {...inputProps}
                type="tel"
                name="telefone"
                required
              />
            )}
          </InputMask>
        </Form.Group>
        
        <Form.Group controlId="formExperiencia">
          <Form.Label>Experiência (anos)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            name="experiencia"
            value={Jogadores.experiencia}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group controlId="formTipoArmaPreferida">
          <Form.Label>Tipo de Arma Preferida</Form.Label>
          <Form.Control
            type="text"
            name="tipoArmaPreferida"
            value={Jogadores.tipoArmaPreferida}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Cadastrar Jogadores
        </Button>
      </Form>
    </Pagina>
  );
}

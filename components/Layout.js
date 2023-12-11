import Nav from "./nav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <nav />
      <br />
      <Container>{props.children}</Container>
      <br />
    </>
  );
}
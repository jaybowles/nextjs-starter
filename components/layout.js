import { NextAuth } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import Cookies from "universal-cookie";
import Styles from "../css/index.scss";
import Package from "../package";
import Signin from "./signin";

export default class extends React.Component {
  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      providers: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
      fluid: React.PropTypes.boolean,
      navmenu: React.PropTypes.boolean,
      signinBtn: React.PropTypes.boolean
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      modal: false,
      providers: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  async toggleModal(e) {
    if (e) e.preventDefault();

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies();
      cookies.set("redirect_url", window.location.pathname, { path: "/" });
    }

    this.setState({
      providers: this.state.providers || (await NextAuth.providers()),
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{Package.name}</title>
          <style dangerouslySetInnerHTML={{ __html: Styles }} />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
        </Head>
        <Navbar light className="navbar navbar-expand-md pt-3 pb-3">
          <Link prefetch href="/">
            <NavbarBrand href="/">{Package.name}</NavbarBrand>
          </Link>
          <Nav>
            <NavItem>
              <Link prefetch href="/">
                <NavLink>
                  <a href="#">My Things</a>
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link prefetch href="/marketplace">
                <NavLink>
                  <a href="#">Marketplace</a>
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
        <MainBody
          navmenu={this.props.navmenu}
          fluid={this.props.fluid}
          container={this.props.container}
        >
          {this.props.children}
        </MainBody>
        <Container fluid={this.props.fluid}>
          <hr className="mt-3" />
          <p className="text-muted small">
            <Link href="https://github.com/iaincollins/nextjs-starter">
              <a className="text-muted font-weight-bold">
                <span className="icon ion-logo-github" /> {Package.name}{" "}
                {Package.version}
              </a>
            </Link>
            <span> built with </span>
            <Link href="https://github.com/zeit/next.js">
              <a className="text-muted font-weight-bold">
                Next.js {Package.dependencies.next.replace("^", "")}
              </a>
            </Link>
            <span> &amp; </span>
            <Link href="https://github.com/facebook/react">
              <a className="text-muted font-weight-bold">
                React {Package.dependencies.react.replace("^", "")}
              </a>
            </Link>
            .
            <span className="ml-2">&copy; {new Date().getYear() + 1900}.</span>
          </p>
        </Container>
        <SigninModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          session={this.props.session}
          providers={this.state.providers}
        />
      </React.Fragment>
    );
  }
}

export class MainBody extends React.Component {
  render() {
    if (this.props.container === false) {
      return <React.Fragment>{this.props.children}</React.Fragment>;
    } else if (this.props.navmenu === false) {
      return (
        <Container fluid={this.props.fluid} style={{ marginTop: "1em" }}>
          {this.props.children}
        </Container>
      );
    } else {
      return (
        <Container fluid={this.props.fluid} style={{ marginTop: "1em" }}>
          <Row>
            <Col xs="12" md="9" lg="10">
              {this.props.children}
            </Col>
            <Col xs="12" md="3" lg="2" style={{ paddingTop: "1em" }}>
              <h5 className="text-muted text-uppercase">Examples</h5>
              <ListGroup>
                <ListGroupItem>
                  <Link prefetch href="/examples/authentication">
                    <a href="/examples/authentication" className="d-block">
                      Auth
                    </a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link prefetch href="/examples/async">
                    <a href="/examples/async" className="d-block">
                      Async
                    </a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link prefetch href="/examples/layout">
                    <a href="/examples/layout" className="d-block">
                      Layout
                    </a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link prefetch href="/examples/routing">
                    <a href="/examples/routing" className="d-block">
                      Routing
                    </a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link prefetch href="/examples/styling">
                    <a href="/examples/styling" className="d-block">
                      Styling
                    </a>
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);
  }

  async handleSignoutSubmit(event) {
    event.preventDefault();

    // Save current URL so user is redirected back here after signing out
    const cookies = new Cookies();
    cookies.set("redirect_url", window.location.pathname, { path: "/" });

    await NextAuth.signout();
    Router.push("/");
  }

  render() {
    if (this.props.session && this.props.session.user) {
      // If signed in display user dropdown menu
      const session = this.props.session;
      return (
        <Nav className="ml-auto" navbar>
          {/*<!-- Uses .nojs-dropdown CSS to for a dropdown that works without client side JavaScript ->*/}
          <div tabIndex="2" className="dropdown nojs-dropdown">
            <div className="nav-item">
              <span className="dropdown-toggle nav-link d-none d-md-block">
                <span
                  className="icon ion-md-contact"
                  style={{
                    fontSize: "2em",
                    position: "absolute",
                    top: -5,
                    left: -25
                  }}
                />
              </span>
              <span className="dropdown-toggle nav-link d-block d-md-none">
                <span className="icon ion-md-contact mr-2" />
                {session.user.name || session.user.email}
              </span>
            </div>
            <div className="dropdown-menu">
              <Link prefetch href="/account">
                <a href="/account" className="dropdown-item">
                  <span className="icon ion-md-person mr-1" /> Your Account
                </a>
              </Link>
              <AdminMenuItem {...this.props} />
              <div className="dropdown-divider d-none d-md-block" />
              <div className="dropdown-item p-0">
                <Form
                  id="signout"
                  method="post"
                  action="/auth/signout"
                  onSubmit={this.handleSignoutSubmit}
                >
                  <input
                    name="_csrf"
                    type="hidden"
                    value={this.props.session.csrfToken}
                  />
                  <Button
                    type="submit"
                    block
                    className="pl-4 rounded-0 text-left dropdown-item"
                  >
                    <span className="icon ion-md-log-out mr-1" /> Sign out
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Nav>
      );
    }
    if (this.props.signinBtn === false) {
      // If not signed in, don't display sign in button if disabled
      return null;
    } else {
      // If not signed in, display sign in button
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            {/**
             * @TODO Add support for passing current URL path as redirect URL
             * so that users without JavaScript are also redirected to the page
             * they were on before they signed in.
             **/}
            <a
              href="/auth?redirect=/"
              className="btn btn-outline-primary"
              onClick={this.props.toggleModal}
            >
              <span className="icon ion-md-log-in mr-1" /> Sign up / Sign in
            </a>
          </NavItem>
        </Nav>
      );
    }
  }
}

export class AdminMenuItem extends React.Component {
  render() {
    if (this.props.session.user && this.props.session.user.admin === true) {
      return (
        <React.Fragment>
          <Link prefetch href="/admin">
            <a href="/admin" className="dropdown-item">
              <span className="icon ion-md-settings mr-1" /> Admin
            </a>
          </Link>
        </React.Fragment>
      );
    } else {
      return <div />;
    }
  }
}

export class SigninModal extends React.Component {
  render() {
    if (this.props.providers === null) return null;

    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggleModal}
        style={{ maxWidth: 700 }}
      >
        <ModalHeader>Sign up / Sign in</ModalHeader>
        <ModalBody style={{ padding: "1em 2em" }}>
          <Signin
            session={this.props.session}
            providers={this.props.providers}
          />
        </ModalBody>
      </Modal>
    );
  }
}

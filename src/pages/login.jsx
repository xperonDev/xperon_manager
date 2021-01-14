import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { baseUrl } from "../url";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../Recoil/root";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [isSignedIn, setLogin] = useRecoilState(isLoggedIn);
  const [data, setData] = useState({ account: "", password: "" });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          XPERON MANAGER
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={data.account}
            onChange={(e) => {
              setData({ ...data, account: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="아이디"
            // autoComplete="email"
            autoFocus
          />
          <TextField
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={async () => {
              // if (!data.account || !data.password)
              //   return alert("아이디와 비밀번호를 입력해 주세요.");
              axios
                .post(baseUrl + "/login", data)
                .then((res) => {
                  if (!res.data.success) {
                    alert(res.data.message);
                  } else {
                    if (res.data.token) {
                      window.sessionStorage.setItem("token", res.data.token);
                      setLogin(true);
                      props.history.push("/list");
                    }
                  }
                })
                .catch((e) => alert("에러발생: " + e));
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
}

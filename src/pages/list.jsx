import { Container, Button, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import react, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getInfo, getList, setState } from "../api";
import { isLoggedIn } from "../Recoil/root";
import moment from "moment";

export default function List(props) {
  const [isSignedIn, setLogin] = useRecoilState(isLoggedIn);
  const [list, setList] = useState([]);
  const [paginationData, setPagenation] = useState({ page: 1, count: 0 });
  const [mutateCount, setMutateCount] = useState(0);
  const [info, setInfo] = useState({
    golfDiv: "", //
    storeNm: "",
    storeTel: "",
    storeAddr: "",
    owner: {
      name: "",
      nickname: "",
    },
  });

  const itemsPerPage = 10;

  const getUserInfo = async (props) => {
    const res = await getInfo();
    if (!res.success) return alert("네트워크 환경을 확인해 주세요.");
    setInfo(res.data);
  };

  const getListData = async () => {
    const orders = await getList(
      (paginationData.page - 1) * itemsPerPage,
      itemsPerPage
    );
    setPagenation({
      ...paginationData,
      count: Math.ceil(orders.count / itemsPerPage),
    });
    setList(orders.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getListData();
  }, [paginationData.page, mutateCount]);

  if (isSignedIn) {
    return (
      <Container maxWidth="md" style={{ paddingTop: 30 }}>
        <Typography variant="h5" align="center" style={{ marginBottom: 30 }}>
          엑스페론 매장 관리자
        </Typography>

        <Typography align="center">{`${info.golfDiv} / ${info.storeNm} / ${info.owner.nickname} `}</Typography>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            로그아웃
          </Button>
        </div>
        {list.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              borderBottom: `1px solid lightgrey`,
              height: 80,
            }}
          >
            <Typography style={{ width: "80%" }} variant="body2">{`😃 ${
              item.name
            } 📳 ${item.phone} 👨‍👧‍👧 ${item.totPeople}인 📆 ${item.resDay} ${
              item.resTime
            } ⛳ ${item.holeDiv} 📅 신청일시: ${moment(item.createdAt).format(
              "YY-MM-DD HH:MM"
            )}`}</Typography>
            {item.resStat == "요청" ? (
              <div style={{ display: "flex" }}>
                <Button
                  onClick={async () => {
                    const result = await setState(item.id, true);
                    if (result.success) return setMutateCount(mutateCount + 1);
                  }}
                  color="primary"
                  style={{ marginRight: 6, marginLeft: 6 }}
                  variant="outlined"
                >
                  승인
                </Button>
                <Button
                  onClick={async () => {
                    const result = await setState(item.id, false);
                    if (result.success) return setMutateCount(mutateCount + 1);
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  거절
                </Button>
              </div>
            ) : item.resStat == "성공" ? (
              <Typography color="primary">승인 완료</Typography>
            ) : (
              <Typography color="secondary">거절 완료</Typography>
            )}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
          }}
        >
          <Pagination
            page={paginationData.page}
            onChange={(event, value) => {
              setPagenation({ ...paginationData, page: value });
            }}
            count={paginationData.count}
          />
        </div>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md">
        <Typography align="center">로그인 후 이용해 주세요.</Typography>
      </Container>
    );
  }
}

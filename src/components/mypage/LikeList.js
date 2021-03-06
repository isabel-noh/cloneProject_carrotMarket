import React from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Image, Grid, Text } from "../../elements/index";

import FavoriteIcon from "@mui/icons-material/Favorite";

const Categories = (props) => {
  const like_list = useSelector((state) => state.post?.like_list);
  const is_login = useSelector((state) => state.user.is_login);

  const history = useHistory();
  console.log("like_list", like_list);
  //없으면 빈채로 보여주고 생긴다음에 밑에 보여줌
  if (!like_list) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <Grid bg="white" height="84%" fixed top="8%" padding="0px 16px" scroll>
        {like_list.map((p) => {
          return (
            <Grid
              key={p.postId}
              height="21%"
              _onClick={() => {
                if (!is_login) {
                  window.alert("로그인 후 게시물을 확인할 수 있습니다!");
                  history.push("/login");
                } else {
                  history.push(`/post/detail/${p.postId}`);
                }
              }}
            >
              <Post key={p.postId}>
                <ImageBox>
                  <Image src={p.imageUrl}></Image>
                </ImageBox>
                <Contents>
                  <Text>{p.postTitle}</Text>

                  <Text>
                    {p.location} {p.createdAt}
                  </Text>

                  <Text bold>{p.price} 원</Text>

                  <Text>{p.category}</Text>

                  <Heart>
                    <FavoriteIcon></FavoriteIcon>
                    <Text>{p.likeCount}</Text>
                  </Heart>
                </Contents>
              </Post>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Categories;

const Post = styled.div`
  width: 100%;
  border-bottom: 1px solid #bbb;
  margin: auto;
  display: flex;
  padding: 8px 0px;
`;

const ImageBox = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 70%;
  padding: 8px 0;
`;

const Heart = styled.div`
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px 0 0;
`;

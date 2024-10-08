import styled from "@emotion/styled";
import Test from "Test";
import BoardField from "components/board/BoardField";
import BoardHeader from "components/board/header/BoardHeader";
import {
  DocumentData,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import boardState from "store/boardState";

const BoardWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
`;

const Board = (): JSX.Element => {
  const { cursorState } = boardState();
  const [canvasState, setCanvasState] = useState<
    DocumentData | null | undefined
  >(null);
  useEffect(() => {
    // Firestore에서 실시간 캔버스 상태 가져오기
    // const unsubscribe = db
    //   .collection("canvas")
    //   .doc("current")
    //   .onSnapshot(doc => {
    //     setCanvasState(doc.data());
    //   });

    const unsubscribe = onSnapshot(doc(db, "canvas", "current"), doc => {
      setCanvasState(doc.data());
    });

    return () => unsubscribe();
  }, []);

  const updateCanvasState = async (newState: any) => {
    // Firestore에 캔버스 상태 업데이트
    await setDoc(doc(db, "canvas", "current"), newState, { merge: true });
  };

  return (
    <BoardWrap>
      <BoardHeader />
      <BoardField canvasState={canvasState} />
      {/* <Test></Test> */}
    </BoardWrap>
  );
};

export default Board;

import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { key } from "./keys.js";

const lectureTab = (lectureId, lectureName) => {
  if (localStorage.FeedBack_QuickAccess) {
    let currentTabs = jwt_decode(localStorage.FeedBack_QuickAccess).tabs;
    let newTab = {
      type: "lec",
      id: lectureId,
      name: lectureName
    };
    console.log(currentTabs);
    jwt.sign(
      { tabs: currentTabs.push(newTab) },
      key.secretOrKey,
      (err, token) => {
        if (err) {
          return -1;
        } else {
          localStorage.setItem("FeedBack_QuickAccess", token);
        }
      }
    );
  } else {
    const newTab = { type: "lec", id: lectureId, name: lectureName };
    jwt.sign({ tabs: [newTab] }, key.secretOrKey, (err, token) => {
      if (err) {
        return -1;
      } else {
        localStorage.setItem("FeedBack_QuickAccess", token);
      }
    });
  }
};

export default lectureTab;

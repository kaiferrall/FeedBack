//Compare old and new props of courses
export default function(nextProps, oldProps) {
  console.log(nextProps);
  if (nextProps.length !== oldProps.length) {
    return true;
  } else {
    for (var i = 0; i < nextProps.length; i++) {
      if (nextProps[i]._id != oldProps[i]._id) {
        return true;
      }
    }
    return false;
  }
}

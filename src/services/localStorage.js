export function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export function getData() {
  const tasks = localStorage.getItem("data");
  return tasks ? JSON.parse(data) : false;
}

export function clearData() {
  localStorage.removeItem("data");
}

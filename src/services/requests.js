const { REACT_APP_ORDER_API_ROOT } = process.env;

export async function getAllRequests() {
  const res = await fetch(`${REACT_APP_ORDER_API_ROOT}/order/api`);
  const json = await res.json();
  return json;
}

export async function getRequestById(id) {}

export async function createRequest() {}

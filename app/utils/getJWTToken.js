export function getJWTToken() {
  if (typeof window !== "undefined") {
    const newToken = localStorage.getItem("token");
    if (newToken) {
      return newToken;
    } else {
        return null;
    }
  } return null;
}

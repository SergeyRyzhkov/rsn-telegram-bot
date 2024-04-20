export const catchError = () => {
  return async (error) => {
    try {
      const ctx = error?.ctx;
      console.log(`Error while handling update ${ctx.update.update_id}:`);
      const e = error.error;
      console.log("Unknown error:", error?.error);
    } catch {
      console.log("Error in catchError");
    }
  };
};

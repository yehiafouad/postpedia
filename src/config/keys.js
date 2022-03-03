export const keys = {
  SERVER_URL:
    process.env.NODE_ENV !== 'production'
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_SERVER_URL,
}
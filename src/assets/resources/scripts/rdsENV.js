export function getEnvParams () {
  const env = process.env.NODE_ENV;
  let uri = 'http://localhost:3001/graphql';
  if (env === 'development') {
    uri = 'http://ec2-13-230-167-168.ap-northeast-1.compute.amazonaws.com/graphql'
  }
  if (env === 'staging') {
    uri = 'http://ec2-52-197-102-185.ap-northeast-1.compute.amazonaws.com/graphql'
  }
  return uri;
}
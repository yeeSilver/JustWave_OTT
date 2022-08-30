// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
//id(이미지경로)와 format을 받을 건데, format(크기,width)은 안넘어 올 수도 있으니 ?를 꼭 넣어줘
export function makeImgPath(id: string, format?: string) {
  return `https://api.themoviedb.org/t/p/${format ? format : "original"}/${id}`;
}

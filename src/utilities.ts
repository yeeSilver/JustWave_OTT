//id(이미지경로)와 format을 받을 건데, format(크기,width)은 안넘어 올 수도 있으니 ?를 꼭 넣어줘
export function makeImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

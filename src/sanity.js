import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'orvs87q0', // 👈 한글을 지우고 복사한 8자리 알파벳/숫자를 따옴표 안에 딱 맞게 넣어주세요.
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03', 
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
<h2>Introduction</h2>
<p>Images play a super important part in website</p>
<p>For performance, you should choose an image format like WebP and provide image files for desktop and mobile. But you may have an image in another format and size, so how do you convert between image format and change size? And do it automatically?</p>

<p>The sharp package, which next.js also uses for the Image component, provides the answer</p>

<h2>Motivation</h2>
This repository is part of my blog post <a href='https://nathankrasney.com/posts/load-image-faster-with-webp'>"Load Image File Faster with WebP"</a>

<h2>Usage</h2>

```
npm run dev
```

<h2>Implementation</h2>
<ul>
<li>InternalApi.ConvertOneToWebp - convert an image file in /public/images to webp file in the same directory</li>
<li>InternalApi.ConvertAllToWebp - convert recursively all non WebP files in /public/images to WebP files in the same directory</li>
<li>InternalApi.FileSize - compute the file size in kb</li>
<li>InternalApi.ScaleOne - scale an image file by a factor and create a file in the same directory. The create file name includes the width</li>
<li>InternalApi.ScaleAllWebp - scale recursively all WebP files in /public/images to WebP files in /public/images/scaled, keeping the tree structure</li>
</ul>

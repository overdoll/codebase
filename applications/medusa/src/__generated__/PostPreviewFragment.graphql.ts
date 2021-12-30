/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCharactersFragment" | "PostStaticCategoriesFragment" | "PostGalleryContentFragment">;
    readonly " $refType": "PostPreviewFragment";
};
export type PostPreviewFragment$data = PostPreviewFragment;
export type PostPreviewFragment$key = {
    readonly " $data"?: PostPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'a5b7983ffe60d580f616f3a0f2e853b6';
export default node;

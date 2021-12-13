/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostAudienceFragment" | "PostCharactersFragment" | "PostCategoriesFragment" | "PostGalleryContentFragment">;
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
      "name": "PostAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCategoriesFragment"
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
(node as any).hash = '19e7a347ec4b3908dc59bd8afb34bfe3';
export default node;

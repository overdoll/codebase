/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCharactersFragment" | "PostStaticCategoriesFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment">;
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
      "name": "PostGalleryPublicDetailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '2f75ca6de0ae9e7f992811723c75f4e2';
export default node;

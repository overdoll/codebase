/**
 * @generated SignedSource<<0ec694d7ff4343e595b8e4b39806c9f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RepostPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CopyLinkPublicPostFragment" | "SocialRepostPublicPostFragment">;
  readonly " $fragmentType": "RepostPublicPostFragment";
};
export type RepostPublicPostFragment$key = {
  readonly " $data"?: RepostPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RepostPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RepostPublicPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CopyLinkPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SocialRepostPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "22fe7586949886966b7c7c32d3c0f39e";

export default node;

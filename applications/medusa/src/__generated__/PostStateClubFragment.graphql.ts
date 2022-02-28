/**
 * @generated SignedSource<<2c6945c3f1ff691792378909e99616f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStateClubFragment$data = {
  readonly id: string;
  readonly __typename: "Club";
  readonly " $fragmentType": "PostStateClubFragment";
};
export type PostStateClubFragment = PostStateClubFragment$data;
export type PostStateClubFragment$key = {
  readonly " $data"?: PostStateClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStateClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "52fbab12cfd52a6ad0bc02693dc39620";

export default node;

/**
 * @generated SignedSource<<3ad6d0481d899055aaf6f6e5b4a53a33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubManageButtonFragment$data = {
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly " $fragmentType": "ClubManageButtonFragment";
};
export type ClubManageButtonFragment = ClubManageButtonFragment$data;
export type ClubManageButtonFragment$key = {
  readonly " $data"?: ClubManageButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubManageButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubManageButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1cae44ade1f00a7b8c770232242fd618";

export default node;

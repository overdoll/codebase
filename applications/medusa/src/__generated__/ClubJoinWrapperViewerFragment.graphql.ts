/**
 * @generated SignedSource<<81631b7b84f1291caa9d9740ac3591f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinWrapperViewerFragment$data = {
  readonly clubMembershipsCount: number;
  readonly clubMembershipsLimit: number;
  readonly " $fragmentType": "ClubJoinWrapperViewerFragment";
};
export type ClubJoinWrapperViewerFragment$key = {
  readonly " $data"?: ClubJoinWrapperViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinWrapperViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinWrapperViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsLimit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "31bc5fc69b47a6bf4bef44c6edc3918a";

export default node;

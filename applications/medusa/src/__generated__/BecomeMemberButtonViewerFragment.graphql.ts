/**
 * @generated SignedSource<<dc4d7ea17c81e63031562e086198c788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BecomeMemberButtonViewerFragment$data = {
  readonly clubMembershipsLimit: number;
  readonly clubMembershipsCount: number;
  readonly " $fragmentType": "BecomeMemberButtonViewerFragment";
};
export type BecomeMemberButtonViewerFragment = BecomeMemberButtonViewerFragment$data;
export type BecomeMemberButtonViewerFragment$key = {
  readonly " $data"?: BecomeMemberButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BecomeMemberButtonViewerFragment",
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

(node as any).hash = "517ce4d2b252531a6b7bea12e41669a5";

export default node;

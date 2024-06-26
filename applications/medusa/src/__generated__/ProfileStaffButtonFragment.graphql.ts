/**
 * @generated SignedSource<<649b0f5a7387951a016cf6398a764f76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileStaffButtonFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfileStaffButtonFragment";
};
export type ProfileStaffButtonFragment$key = {
  readonly " $data"?: ProfileStaffButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileStaffButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileStaffButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "72a964e3ad592c7afb0db9a7cc55aed6";

export default node;

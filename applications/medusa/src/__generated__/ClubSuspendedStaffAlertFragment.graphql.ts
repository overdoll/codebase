/**
 * @generated SignedSource<<572047878c9b96984d34a9258302666f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSuspendedStaffAlertFragment$data = {
  readonly slug: string;
  readonly suspension: {
    readonly expires: any;
  } | null;
  readonly " $fragmentType": "ClubSuspendedStaffAlertFragment";
};
export type ClubSuspendedStaffAlertFragment = ClubSuspendedStaffAlertFragment$data;
export type ClubSuspendedStaffAlertFragment$key = {
  readonly " $data"?: ClubSuspendedStaffAlertFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSuspendedStaffAlertFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSuspendedStaffAlertFragment",
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
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "expires",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "75511a5ed3d9fcdf4da1defe9fbdd7de";

export default node;

/**
 * @generated SignedSource<<42f029b5672cd8f3c3cb9ab2c09c4d0e>>
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
  readonly termination: {
    readonly __typename: string;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubTermination",
      "kind": "LinkedField",
      "name": "termination",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "350bb1d9390d243d5a52c4384eb949c7";

export default node;

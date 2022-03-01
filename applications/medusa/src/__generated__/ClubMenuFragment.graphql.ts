/**
 * @generated SignedSource<<ffa5933fe88ec8a232b88fd515c5be04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubMenuFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubMenuFragment";
};
export type ClubMenuFragment = ClubMenuFragment$data;
export type ClubMenuFragment$key = {
  readonly " $data"?: ClubMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6cfbe727e3e1b5cd703561dba0e34a66";

export default node;

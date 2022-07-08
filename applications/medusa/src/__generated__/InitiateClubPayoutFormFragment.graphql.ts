/**
 * @generated SignedSource<<e9fd1b981d75c30b2a7d47aa2d9d4de0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InitiateClubPayoutFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "InitiateClubPayoutFormFragment";
};
export type InitiateClubPayoutFormFragment$key = {
  readonly " $data"?: InitiateClubPayoutFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InitiateClubPayoutFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InitiateClubPayoutFormFragment",
  "selections": [
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

(node as any).hash = "775dea4a2879e03c79d5cdd53d7ef471";

export default node;

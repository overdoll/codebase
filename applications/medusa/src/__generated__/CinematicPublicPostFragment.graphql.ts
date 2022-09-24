/**
 * @generated SignedSource<<455eb8da5db34959d72d6eb440072488>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicPublicPostFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicContentFragment">;
  readonly " $fragmentType": "CinematicPublicPostFragment";
};
export type CinematicPublicPostFragment$key = {
  readonly " $data"?: CinematicPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "2e372ee33a6e9c79760f4363509c306f";

export default node;

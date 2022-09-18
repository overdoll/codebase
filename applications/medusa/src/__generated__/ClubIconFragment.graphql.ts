/**
 * @generated SignedSource<<832d874d241c7188957e3edaac3901d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubIconFragment$data = {
  readonly id: string;
  readonly thumbnailMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"IconMediaFragment">;
  } | null;
  readonly " $fragmentType": "ClubIconFragment";
};
export type ClubIconFragment$key = {
  readonly " $data"?: ClubIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubIconFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "thumbnailMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IconMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "3f39ca5929a6638fe2cefcfa29a44849";

export default node;

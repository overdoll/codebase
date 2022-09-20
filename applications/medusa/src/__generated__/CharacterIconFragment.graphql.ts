/**
 * @generated SignedSource<<9e4f486bbe118d5fb4fefb97aa221e61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterIconFragment$data = {
  readonly bannerMedia: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"IconMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "CharacterIconFragment";
};
export type CharacterIconFragment$key = {
  readonly " $data"?: CharacterIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterIconFragment",
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
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IconMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "a90195e8e7be068c0c3baf4bbf5bbd27";

export default node;

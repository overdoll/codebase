/**
 * @generated SignedSource<<f20f525d26f496197fc825eacd0fe6f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickableCharacterFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment">;
  readonly " $fragmentType": "ClickableCharacterFragment";
};
export type ClickableCharacterFragment$key = {
  readonly " $data"?: ClickableCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickableCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClickableCharacterFragment",
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterLinkTileFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "632aee8db49b94a5855d90e764dc6669";

export default node;

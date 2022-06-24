/**
 * @generated SignedSource<<7064ee69a6b44cd7d04f58733ee22d5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCharacterThumbnailFragment$data = {
  readonly id: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeCharacterThumbnailFragment";
};
export type ChangeCharacterThumbnailFragment$key = {
  readonly " $data"?: ChangeCharacterThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCharacterThumbnailFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
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
      "name": "ChangeCharacterThumbnailFormFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "770f2f5f58027718acc0edbc7a3cdff0";

export default node;

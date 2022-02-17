/**
 * @generated SignedSource<<69754bce5e263dcfaa542c824b3d8e33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCharacterThumbnailFragment$data = {
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeCharacterThumbnailFragment";
};
export type ChangeCharacterThumbnailFragment = ChangeCharacterThumbnailFragment$data;
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

(node as any).hash = "4a00047f793a9b518ab414c1a05e24e5";

export default node;

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CharacterTileOverlayFragment = {
    readonly name: string;
    readonly series: {
        readonly title: string;
    };
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    } | null;
    readonly " $refType": "CharacterTileOverlayFragment";
};
export type CharacterTileOverlayFragment$data = CharacterTileOverlayFragment;
export type CharacterTileOverlayFragment$key = {
    readonly " $data"?: CharacterTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CharacterTileOverlayFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterTileOverlayFragment",
  "selections": [
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
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
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
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
(node as any).hash = 'a23a84f7796e8c4fa7cef030907dc816';
export default node;

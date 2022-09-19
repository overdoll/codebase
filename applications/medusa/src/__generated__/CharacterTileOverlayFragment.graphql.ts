/**
 * @generated SignedSource<<c381b50074e9eb41caea759c7e530b62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterTileOverlayFragment$data = {
  readonly club: {
    readonly name: string;
  } | null;
  readonly name: string;
  readonly series: {
    readonly title: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterBannerFragment">;
  readonly " $fragmentType": "CharacterTileOverlayFragment";
};
export type CharacterTileOverlayFragment$key = {
  readonly " $data"?: CharacterTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterTileOverlayFragment",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterBannerFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "c1ad4ff73a4f71eddd7650e8a56e0cef";

export default node;

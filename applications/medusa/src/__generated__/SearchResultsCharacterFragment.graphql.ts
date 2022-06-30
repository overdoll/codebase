/**
 * @generated SignedSource<<f7a5671eed0e7ae873394b628ae0cfd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsCharacterFragment$data = {
  readonly series: {
    readonly slug: string;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
  readonly " $fragmentType": "SearchResultsCharacterFragment";
};
export type SearchResultsCharacterFragment$key = {
  readonly " $data"?: SearchResultsCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCharacterFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsCharacterFragment",
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterTileOverlayFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "b82c89741f415d5f0e41f13906c5bfdd";

export default node;

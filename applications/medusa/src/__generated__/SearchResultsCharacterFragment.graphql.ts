/**
 * @generated SignedSource<<a5101c7fc6cd75c5c93cd2a6260c960c>>
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
  } | null;
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

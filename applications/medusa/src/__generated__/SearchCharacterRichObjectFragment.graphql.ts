/**
 * @generated SignedSource<<b410e5436e75bf7b4e641543441b9130>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterRichObjectFragment$data = {
  readonly name: string;
  readonly series: {
    readonly slug: string;
  };
  readonly slug: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
  } | null;
  readonly " $fragmentType": "SearchCharacterRichObjectFragment";
};
export type SearchCharacterRichObjectFragment$key = {
  readonly " $data"?: SearchCharacterRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCharacterRichObjectFragment">;
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
  "name": "SearchCharacterRichObjectFragment",
  "selections": [
    (v0/*: any*/),
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
        (v0/*: any*/)
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
          "name": "ResourceRichObjectFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "661a5d7d9d038e93ea7f1f6865a2f4a7";

export default node;

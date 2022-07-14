/**
 * @generated SignedSource<<e1064873bf3f3e8b66c84060f287fe92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCharacterRichObjectFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceRichObjectFragment">;
  } | null;
  readonly name: string;
  readonly series: {
    readonly slug: string;
  } | null;
  readonly slug: string;
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
      "name": "banner",
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

(node as any).hash = "95d380ea30ece7fdb2e8ceb9f77aa840";

export default node;

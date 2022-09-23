/**
 * @generated SignedSource<<39bd044e6a44c85a5f2b23613b325362>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewSeriesFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly series: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"PreviewSeriesFragment" | "SeriesLinkTileFragment">;
    } | null;
  }>;
  readonly " $fragmentType": "PostPreviewSeriesFragment";
};
export type PostPreviewSeriesFragment$key = {
  readonly " $data"?: PostPreviewSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewSeriesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewSeriesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
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
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SeriesLinkTileFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PreviewSeriesFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "a126caf15e9737883ca81705bb2ba190";

export default node;

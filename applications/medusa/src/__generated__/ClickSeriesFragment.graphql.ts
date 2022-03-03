/**
 * @generated SignedSource<<7a2d99bfa889121af22739a1efcaf7f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickSeriesFragment$data = {
  readonly series: {
    readonly title: string;
    readonly slug: string;
  };
  readonly " $fragmentType": "ClickSeriesFragment";
};
export type ClickSeriesFragment = ClickSeriesFragment$data;
export type ClickSeriesFragment$key = {
  readonly " $data"?: ClickSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClickSeriesFragment",
  "selections": [
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "56c2eab97562040234d7f4deb51bb078";

export default node;

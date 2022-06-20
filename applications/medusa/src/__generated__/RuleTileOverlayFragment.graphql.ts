/**
 * @generated SignedSource<<1d66b32226170d27b0c6c70bb84924bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RuleTileOverlayFragment$data = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly " $fragmentType": "RuleTileOverlayFragment";
};
export type RuleTileOverlayFragment = RuleTileOverlayFragment$data;
export type RuleTileOverlayFragment$key = {
  readonly " $data"?: RuleTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RuleTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RuleTileOverlayFragment",
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "1403c5867c11b52641ef750c6f078bd9";

export default node;

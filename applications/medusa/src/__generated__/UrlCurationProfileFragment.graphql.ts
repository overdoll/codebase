/**
 * @generated SignedSource<<66c561ead88929f0cc5ba5393cc3fdd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UrlCurationProfileFragment$data = {
  readonly clubMembershipsCount: number;
  readonly curationProfile: {
    readonly audience: {
      readonly completed: boolean;
    };
  };
  readonly " $fragmentType": "UrlCurationProfileFragment";
};
export type UrlCurationProfileFragment$key = {
  readonly " $data"?: UrlCurationProfileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UrlCurationProfileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UrlCurationProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurationProfile",
      "kind": "LinkedField",
      "name": "curationProfile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceCurationProfile",
          "kind": "LinkedField",
          "name": "audience",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "completed",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "69f5f1cbe0a06ef23344326444430658";

export default node;

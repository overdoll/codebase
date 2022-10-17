/**
 * @generated SignedSource<<c44a9414e19bdcb8127134d289022144>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareCurationProfileFragment$data = {
  readonly clubMembershipsCount: number;
  readonly curationProfile: {
    readonly audience: {
      readonly audiences: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
      }>;
    };
    readonly dateOfBirth: {
      readonly completed: boolean;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"CurationProfileFooterFragment">;
  readonly " $fragmentType": "PrepareCurationProfileFragment";
};
export type PrepareCurationProfileFragment$key = {
  readonly " $data"?: PrepareCurationProfileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareCurationProfileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareCurationProfileFragment",
  "selections": [
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
              "concreteType": "Audience",
              "kind": "LinkedField",
              "name": "audiences",
              "plural": true,
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DateOfBirthCurationProfile",
          "kind": "LinkedField",
          "name": "dateOfBirth",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CurationProfileFooterFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "317480142cca8b030cee787e5cf34192";

export default node;
